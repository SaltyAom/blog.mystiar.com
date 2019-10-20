const resolver = {
	Query: {
		getBlogs: async (_, __, { dataSources }, info) => {
			info.cacheControl.setCacheHint({ maxAge: 86400, scope: "PUBLIC" })
			let blogs = await dataSources.MystiarBlog.getBlogs()
			return JSON.parse(blogs)
		},
		getEditorWithBlogs: async (_, { name }, { dataSources }, info) => {
			info.cacheControl.setCacheHint({ maxAge: 86400, scope: "PUBLIC" })
			let editorWithBlog = await dataSources.MystiarBlog.getEditorWithBlogs(
				name
			)
			return JSON.parse(editorWithBlog)
		},
		getBlogBy: async (_, { name }, { dataSources }, info) => {
			info.cacheControl.setCacheHint({ maxAge: 86400, scope: "PUBLIC" })
			let blog = await dataSources.MystiarBlog.getBlogBy(name)
			return JSON.parse(blog)
		},
		getEditor: async (_, __, { dataSources }, info) => {
			info.cacheControl.setCacheHint({ maxAge: 86400, scope: "PUBLIC" })
			let blog = await dataSources.MystiarBlog.getEditor()
			return JSON.parse(blog)
		},
		getEditorBy: async (_, { name }, { dataSources }, info) => {
			info.cacheControl.setCacheHint({ maxAge: 86400, scope: "PUBLIC" })
			let blog = await dataSources.MystiarBlog.getEditorBy(name)
			return JSON.parse(blog)
		},
		getLanding: async (_, __, { dataSources }, info) => {
			info.cacheControl.setCacheHint({ maxAge: 86400, scope: "PUBLIC" })
			let landing = await dataSources.MystiarBlog.getLanding()
			return JSON.parse(landing)
		}
	}
}

module.exports = resolver
