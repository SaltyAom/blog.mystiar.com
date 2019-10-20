const { gql } = require("apollo-server-express")

const typeDefs = gql`
	type Query {
		getBlogBy(name: String): Blog!
		getBlogs: Blog!
		getEditorBy(name: String): Editor!
		getEditor: Editor!
		getEditorWithBlogs(name: String): EditorWithBlog
		getLanding: Landing!
	}

	type Image {
		width: Int
		height: Int
	}

	type Details {
		size: Int
		image: Image
	}

	type File {
		url: String
		fileName: String
		contentType: String
		details: Details
	}

	type Environment {
		sys: Sys
	}

	type Space {
		sys: Sys
	}

	type Asset {
		fields: Fields
		sys: Sys
	}

	type ContentType {
		sys: Sys
	}

	type Sys {
		id: String
		type: String
		createdAt: String
		updatedAt: String
		revision: Int
		locale: String
		contentType: ContentType
		environment: Environment
		space: Space
	}

	type Entry {
		fields: EditorFields
		sys: Sys
	}

	type Includes {
		Asset: [IncludesAsset]
		Entry: [Entry]
	}

    type IncludesAsset {
        sys: IncludesAssetSys
        fields: AssetsFields
    }

    type AssetsFields {
        title: String
        description: String
        file: File
    }

    type IncludesAssetSys {
        space: Assets
		id: String
		type: String
		createdAt: String
		updatedAt: String
		revision: Int
		locale: String
		contentType: ContentType
		environment: Environment
    }

	type Fields {
		title: String
		editor: Assets
		tags: [String]
		content: ContentFields
		thumbnail: Assets
	}

    type ContentFields {
        data: DataField
        content: [DocumentContent]
        nodeType: String
    }

	type DataField {
		uri: String
	}

    type DocumentContent {
        data: DataType
        content: [Content]
        nodeType: String
    }

	type Content {
		content: [ContentLevel2]
		data: DataField
		value: String
		nodeType: String
		marks: [Marks]
	}

	type ContentLevel2 {
		content: [ContentLevel3]
		data: DataField
		value: String
		nodeType: String
		marks: [Marks]
	}

	type ContentLevel3 {
		content: [ContentLevel4]
		data: DataField
		value: String
		nodeType: String
		marks: [Marks]
	}

	type ContentLevel4 {
		content: [String]
		data: DataField
		value: String
		nodeType: String
		marks: [Marks]
	}

	type Marks {
		type: String
	}

    type DataType {
        target: Assets
    }

    type Assets {
        sys: AssetsData
    }
    
    type AssetsData {
        id: String
        type: String
        linkType: String
    }

	type Items {
		fields: Fields
		sys: Sys
	}

	type Blog @cacheControl(maxAge: 86400) {
		total: Int
		includes: Includes
		items: [Items]
	}

	type Editor @cacheControl(maxAge: 86400) {
		total: Int
		items: [EditorItems]
		includes: Includes
	}

	type EditorItems {
		sys: EditorSys
		fields: EditorFields
	}

	type EditorSys {
		id: String
	}

	type EditorFields {
		name: String
		image: Assets
		bio: String
		cover: Assets
	}

	type BlogsByEditor {
		total: Int
		items: [BlogsByEditorItems]
		includes: Includes
	}

	type BlogsByEditorItems {
		fields: BlogByEditorFields
	}

	type BlogByEditorFields {
		title: String
		thumbnail: Assets
		tags: [String]
	}

	type EditorWithBlog @cacheControl(maxAge: 86400) {
		editor: Editor
		blog: BlogsByEditor
	}

	type Landing {
		popularity: Blog!
		recent: Blog!
		editors: Editor!
	}
`

module.exports = typeDefs
