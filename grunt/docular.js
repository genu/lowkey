module.exports = function () {
    return {
        useHtml5Mode: true,
        docular_webapp_target: 'docs',
        groups: [
            {
                groupTitle: 'Failbox',
                groupId: 'failboxApp',
                sections: [
                    {
                        id: 'failboxApp',
                        title: 'API\'s',
                        scripts: ['<%= src %>/modules/**/{,*/}*.js']
                    }
                ]
            }
        ]
    }
};