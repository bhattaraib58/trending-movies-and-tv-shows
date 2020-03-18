import config from '../config';

/**
 * Get Header with Authorization for Fetch.
 *
 * @returns {Object} Header.
 */
function getHeader() {
  const headers = { 'Content-Type': 'application/json;charset=utf-8' };

  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`;
  }

  return headers;
}

/**
 * Fetch All using GET.
 *
 * @param {String} url
 * @returns
 */
function getAll(url) {
  return fetch(url, {
    headers: getHeader()
  })
    .then(response => response.json())
    .then(data => data);
}

/**
 * Fetch data of one by ID.
 *
 * @param {String} url
 * @returns
 */
function getById(url) {
  return fetch(url, {
    headers: getHeader()
  })
    .then(response => response.json())
    .then(data => data);
}

/**
 * Add new Data.
 *
 * @param {String} url
 * @param {Object} data
 * @returns
 */
function post(url, data) {
  return fetch(url, {
    headers: getHeader(),
    method: 'POST',
    body: JSON.stringify(data)
  });
}

/**
 * Update data in url
 *
 * @param {*} url
 * @param {*} data
 * @returns
 */
/**
 * Update data in url.
 *
 * @param {String} url
 * @param {Object} data
 * @returns
 */
function put(url, data) {
  return fetch(url, {
    headers: getHeader(),
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

/**
 * Remove/ Delete from API.
 *
 * @param {String} url
 * @returns
 */
function remove(url) {
  return fetch(url, {
    headers: getHeader(),
    method: 'DELETE'
  });
}

export default {
  getAll,
  getById,
  post,
  put,
  delete: remove
};
