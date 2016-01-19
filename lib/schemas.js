module.exports = {
	clientSnippet: [
		{
			name: 'url',
			label: 'URL',
			type: 'string'
		}
	],
	clientWidget: [
		{
			name: '_client',
			label: 'Select Clients',
			type: 'joinByArray',
			withType: 'client',
			idsField: 'clientId',
			sortable: true
		}
	],
	resume: [
		{
			name: 'title',
			label: 'Document Title',
			type: 'string',
			required: true
		},
		{
			name: 'file',
			label: 'PDF Document',
      type: 'singleton',
      widgetType: 'files',
      options: {
        limit: 1
      },
      required: true
    }
	]
}