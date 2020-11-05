const successMessage = {
  status: 'success',
  data: '',
};

const errorMessage = {
  status: 'error',
  data: '',
};

const status = {
  bad: 400,
  conflict: 409,
  created: 201,
  error: 500,
  nocontent: 204,
  notfound: 404,
  success: 200,
  unauthorized: 401,
};

export { successMessage, errorMessage, status };
