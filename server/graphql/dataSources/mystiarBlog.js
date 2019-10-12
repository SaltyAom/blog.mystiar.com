const { RESTDataSource } = require("apollo-datasource-rest")

class MystiarBlog extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = `https://cdn.contentful.com/spaces/${process.env.spaceID}/environments/master/`
		this.prefix = `entries?access_token=${process.env.accessToken}&`
	}

	async getBlogs() {
		return this.get(
			`${this.prefix}content_type=content&order=sys.createdAt`
		)
	}

	async getBlogBy(name) {
		let blog = await this.get(
			`${this.prefix}content_type=content&fields.title=${name}`
		)
		return blog
	}

	async getEditorWithBlogs(name) {
		let editor = await this.getEditorBy(name)
		editor = JSON.parse(editor)

		let editorID = editor.items[0].sys.id

		let blogs = await this.get(
			`${this.prefix}content_type=content&fields.editor.sys.id=${editorID}&order=sys.createdAt`
		)

		return JSON.stringify(
			Object.assign({
				editor: editor,
				blog: JSON.parse(blogs)
			})
		)
	}

	async getEditor() {
		let editors = await this.get(`${this.prefix}content_type=editor`)
		return editors
	}

	async getEditorBy(name) {
		let editor = await this.get(
			`${this.prefix}content_type=editor&fields.name=${name}`
		)
		return editor
	}
}

module.exports = MystiarBlog
