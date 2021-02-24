from os import path
FILE_CONFIG = dict()
FILE_CONFIG['root'] = '..'
FILE_CONFIG['data'] = path.join(FILE_CONFIG['root'], 'data')
FILE_CONFIG['accounting'] = path.join(FILE_CONFIG['data'], 'finance')
# FILE_CONFIG['management'] = path.join(FILE_CONFIG['data'], 'management')
# FILE_CONFIG['service_charges'] = path.join(FILE_CONFIG['accounting'], 'service_charges')
FILE_CONFIG['blueprints'] = path.join(FILE_CONFIG['data'], 'blueprints')
FILE_CONFIG['imports'] = path.join(FILE_CONFIG['data'], 'imports')
