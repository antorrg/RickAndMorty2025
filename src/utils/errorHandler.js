export default {
  catchController: (controller) => {
    return (req, res, next) => {
      return controller(req, res, next).catch(next)
    }
  },

  throwError: (message, status) => {
    const error = new Error(message)
    error.status = status
    throw error
  },

  middError: (message, status) => {
    const error = new Error(message)
    error.status = status
    return error
  }

}
