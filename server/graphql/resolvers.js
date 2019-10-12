const resolver = {
	Query: {
		getBlogs: async (_, __, { dataSources }) => {
            let blogs = await dataSources.MystiarBlog.getBlogs()
            return JSON.parse(blogs)
        },
        getEditorWithBlogs: async (_, { name }, { dataSources }) => {
            let editorWithBlog = await dataSources.MystiarBlog.getEditorWithBlogs(name)
            return JSON.parse(editorWithBlog)
        },
        getBlogBy: async (_, { name }, { dataSources }) => {
            let blog = await dataSources.MystiarBlog.getBlogBy(name)
            return JSON.parse(blog)
        },
        getEditor: async (_, __, { dataSources }) => {
            let blog = await dataSources.MystiarBlog.getEditor()
            return JSON.parse(blog)
        },
        getEditorBy: async (_, { name }, { dataSources }) => {
            let blog = await dataSources.MystiarBlog.getEditorBy(name)
            return JSON.parse(blog)
        }
	}
}

module.exports = resolver