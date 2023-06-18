from checkov.common.models.enums import CheckCategories, CheckResult
from checkov.cloudformation.checks.resource.base_resource_check import BaseResourceCheck

def has_key(key: str, tags: list):
    for tag in tags:
        if tag['Key'] == key:
            return True
    return False    

class ResourceHasTags(BaseResourceCheck):
    def __init__(self):
        name = 'Ensure S3 resources are tagged with "env" and "owner".'
        check_id = 'SLRK_AWS_3'
        categories = [CheckCategories.CONVENTION]
        supported_resources = ['AWS::*::*']
        super().__init__(name=name, id=check_id, categories=categories, supported_resources=supported_resources)

    def scan_resource_conf(self, conf):
        
        if 'Tags' in conf['Properties']:
            tags: list = conf['Properties']['Tags']
            if has_key('env', tags) & has_key('owner', tags):
                return CheckResult.PASSED
        return CheckResult.FAILED

check = ResourceHasTags()