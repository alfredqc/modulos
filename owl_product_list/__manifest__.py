{
    'name': 'OWL Product List',
    'version': '1.1',
    'author': 'JCMontoya',
    'depends': ['web', 'website', 'sale'],
    'data': [
        'views/actions.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'owl_product_list/static/src/components/*.js',
            'owl_product_list/static/src/components/*.xml',
            'owl_product_list/static/src/components/*.scss'
        ],
    },
    'installable': True,
    'license': 'AGPL-3',
}
