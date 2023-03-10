/**
 * This file contains all the translations of our website
 */
export const messages = {
    en: {
        message: {
            header: {
                menu: {
                    job: 'Job',
                    forum: 'Forum',
                    stories: 'stories',
                    aboutUs: 'aboutUs',
                    login: 'login',
                    logout: 'logout'
                }
            },
            page: {
                jobsearch: {
                    jobItem: {
                        country: 'Country',
                        city: 'City'
                    }
                }
            },
            error: {
                graphql: {

                },
                network: {
                    jwt_token_invalid: 'Login Invalid',
                    jwt_token_expired: 'Token Expired'
                }
            }

        }
    },
    zh: {
        message: {
            header: {
                menu: {
                    job: '职位',
                    forum: '论坛',
                    stories: '社区故事',
                    aboutUs: '关于我们',
                    login: '登录'
                }
            },
            page: {
                jobsearch: {
                    jobItem: {
                        country: '国家',
                        city: '城市'
                    }
                }
            },
            error: {
                graphql: {

                },
                network: {
                    jwt_token_invalid: '登录失败',
                    jwt_token_expired: '密钥过期'
                }
            }

        }

    }
}