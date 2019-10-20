import gql from "graphql-tag"

export const getBlogBy = gql`
	query getBlogBy($name: String) {
		getBlogBy(name: $name) {
			items {
				sys {
					createdAt
					updatedAt
				}
				fields {
					title
					thumbnail {
						sys {
							id
							linkType
						}
					}
					tags
					editor {
						sys {
							id
						}
					}
				}
			}
			includes {
				Entry {
					sys {
						id
					}
					fields {
						name
						bio
						image {
							sys {
								id
							}
						}
					}
				}
				Asset {
					sys {
						id
					}
					fields {
						title
						description
						file {
							url
							fileName
							contentType
							details {
								size
								image {
									width
									height
								}
							}
						}
					}
				}
			}
		}
	}
`

export const getBlogDataBy = gql`
	query getBlogBy($name: String) {
		getBlogBy(name: $name) {
			items {
				fields {
					content {
						nodeType
						content {
							content {
								value
								data {
									uri
								}
								marks {
									type
								}
								content {
									value
									data {
										uri
									}
									marks {
										type
									}
									content {
										value
										data {
											uri
										}
										marks {
											type
										}
										content {
											value
										}
										nodeType
									}
									nodeType
								}
								nodeType
							}
							data {
								target {
									sys {
										id
										type
										linkType
									}
								}
							}
							nodeType
						}
					}
				}
			}
		}
	}
`

export const getEditorWithBlogs = gql`
	query getEditorWithBlogs($name: String) {
		getEditorWithBlogs(name: $name) {
			editor {
				items {
					sys {
						id
					}
					fields {
						name
						image {
							sys {
								id
							}
						}
						bio
						cover {
							sys {
								id
							}
						}
					}
				}
			}
			blog {
				total
				items {
					fields {
						title
						tags
						thumbnail {
							sys {
								id
							}
						}
					}
				}
				includes {
					Asset {
						sys {
							id
						}
						fields {
							file {
								url
							}
							description
						}
					}
				}
			}
		}
	}
`

export const getLanding = gql`
	query getLanding {
		getLanding {
			editors {
				items {
					sys {
						id
					}
					fields {
						name
						image {
							sys {
								id
							}
						}
						bio
					}
				}
				includes {
					Asset {
						sys {
							id
						}
						fields {
							title
							description
							file {
								url
							}
						}
					}
				}
			}
			popularity {
				items {
					fields {
						title
						tags
						editor {
							sys {
								id
							}
						}
						thumbnail {
							sys {
								id
							}
						}
					}
					sys {
						createdAt
						updatedAt
					}
				}
				includes {
					Asset {
						sys {
							id
						}
						fields {
							file {
								url
							}
							description
						}
					}
				}
			}
			recent {
				items {
					fields {
						title
						tags
						editor {
							sys {
								id
							}
						}
						thumbnail {
							sys {
								id
							}
						}
					}
					sys {
						createdAt
						updatedAt
					}
				}
				includes {
					Asset {
						sys {
							id
						}
						fields {
							file {
								url
							}
							description
						}
					}
				}
			}
		}
	}
`