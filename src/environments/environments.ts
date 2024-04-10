// const BASE_API = 'https://be-cdj2.onrender.com'
const BASE_API = 'http://localhost:1002';
// const BASE_API = 'http://localhost:1001';

export const environment = {
  production: false,
  apiExternal: BASE_API + '/easy-learning/public/v1',
  apiMember: BASE_API + '/easy-learning/member/v1',
  API_URL: BASE_API + '/easy-learning',
  USER_URL: '/user',
  ADMIN_URL: '/admin',
  API_ADMIN: '/admin',
  API_PUBLIC: '/public',
  API_MEMBER: '/member',
  API_FILE_UPLOAD: '/file-upload',
  VERSION_1: '/v1',
  API_USER: '/user',
  API_ROLE: '/role',
  API_REPORT: '/report',
  API_TEST: '/test',
  API_VIEW_RESULT_TYPE: '/view-result-type',
  API_TEST_REPORT: '/test-report',
  API_USERINFO: '/info',
  API_AVATAR: '/avatar',
  API_PASSWORD: '/password',
  API_QUESTION: '/question',
  API_IMPORT: '/import-question',
  LOCK_USER: '/lock',
  API_CHANGE_STATUS: '/change-status',
  API_GET_TOKEN_FORGOT_PASSWORD: '/get-token-forgot-pass',
  API_FORGOT_PASSWORD: '/forgot-pass',
  API_LOGOUT: '/logout',
  API_SIGNUP: '/sign-up',
  API_AUTHENTICATION: '/authenticate',
  API_LESSON: '/lesson',
  API_VALID_TOKEN: '/valid-token',
  API_QUESTION_TYPE: '/question-type',
  API_ANSWER: '/answer',
  API_LIST: '/list',
  API_INVOICE: '/invoice',
  API_MOMO: '/momo',
  API_PAYMENT: '/payment',
  API_PACKAGE: '/package-upgrade',
  API_TESTREPORT: '/test-report',
  API_EXAMRESULT: '/rank-report',
  PATH_ID: '/{id}',
  ID: 'id',
  LANGUAGE: 'vi',
  GOOGLE_ID: '12657364022-uhc8klb6t57fkeqvvcb0fjfoscsjf2c3.apps.googleusercontent.com',
  SHOW_RESULT: 'cur',
  NOT_SHOW_RESULT: 'aff',
  API_COMMENT: '/comment',
  API_REACTION: '/reaction',
  FITB_ID: '1c0d9a97-1fb3-40f0-83c5-50d7c7abde4a',
  MCA_ID: 'be385949-73e0-4075-9a40-88f2074c3600',
  SCA_ID: '72aef284-dfd8-42fe-a7d3-372398322d23',
};

export const TRANSLATE = {
  MESSAGE: {
    ERROR: {
      FORM_001: 'message.error.form.001',
      TOKEN_001: 'message.error.token.001',
      PASSWORD_001: 'message.error.password.001',
      FORGET_PASSWORD_CONFIRM_001: 'message.error.forget_password.confirm.001',
      FORGET_PASSWORD_CONFIRM_002: 'message.error.forget_password.confirm.002',
      CREATE_LESSON_001: 'message.error.create_lesson.001',
      CREATE_LESSON_002: 'message.error.create_lesson.002',
      EDIT_LESSON_001: 'message.error.lesson_detail.edit_lesson.001',
      EDIT_LESSON_002: 'message.error.lesson_detail.edit_lesson.002',
      EDIT_LESSON_003: 'message.error.lesson_detail.edit_lesson.003',
    },
    SUCCESS: {
      PASSWORD_001: 'message.success.password.001',
      FORGET_PASSWORD_CONFIRM_001: 'message.success.forget_password.confirm.001',
      FORGET_PASSWORD_001: 'message.success.forget_password.001',
      CREATE_LESSON_001: 'message.success.create_lesson.001',
      EDIT_LESSON_001: 'message.success.lesson_detail.edit_lesson.001',
    },
    PROGRESS: {
      LOGOUT_001: 'message.progress.logout.001',
      FORGET_PASSWORD_CONFIRM_001: 'message.progress.forget_password.confirm.001',
      FORGET_PASSWORD_001: 'message.progress.forget_password.001',
      CREATE_LESSON_001: 'message.progress.create_lesson.001',
      EDIT_LESSON_001: 'message.progress.lesson_detail.edit_lesson.001',
    },
    CONFIRM_MODAL: {
      TITLE: 'message.confirm_modal.title',
      BODY: 'message.confirm_modal.body',
    },
    SWAL_TITLE_SUCCESS: 'message.swal.title.success',
    SWAL_TITLE_ERROR: 'message.swal.title.error',

  },
};
