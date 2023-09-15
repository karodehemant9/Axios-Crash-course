//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';






// GET REQUEST
function getTodos() {
  // axios({
  //   method : 'get',
  //   url : 'https://jsonplaceholder.typicode.com/todos',
  //   params : {
  //     _limit : 10     //limit our response data to 10 to-do list
  //   }
  // })
  // .then((response) => showOutput(response))
  // .catch((error) => console.log(error));

  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then((response) => showOutput(response))
    .catch((error) => console.log(error));

}






// POST REQUEST
function addTodo() {
  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      "title": "hii everyone",
      "completed": false
    }
  })
    .then((response) => showOutput(response))
    .catch((error) => console.log(error));


  // axios.post('https://jsonplaceholder.typicode.com/todos?_limit=10', {     
  //   "title": "hii everyone",
  //   "completed": false
  // })
  // .then((response) => showOutput(response))
  // .catch((error) => console.log(error));
}





// PUT REQUEST
function putTodo() {
  axios({
    method: 'put',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    data: {
      "title": "put updated total object"
    }
  })
    .then((response) => showOutput(response))
    .catch((error) => console.log(error));
}





//PATCH REQUEST
function patchTodo() {
  axios({
    method: 'patch',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    data: {
      "title": "patch updated only this field"
    }
  })
    .then((response) => showOutput(response))
    .catch((error) => console.log(error));
}




// DELETE REQUEST
function removeTodo() {
  axios({
    method: 'delete',
    url: 'https://jsonplaceholder.typicode.com/todos/1'
  })
    .then((response) => showOutput(response))
    .catch((error) => console.log(error));
}




// SIMULTANEOUS DATA
function getData() {
  // axios.all([
  //   axios.get('https://jsonplaceholder.typicode.com/todos'),
  //   axios.post('https://jsonplaceholder.typicode.com/posts')
  // ])
  // .then((response) => {
  //   console.log(response[0]);
  //   console.log(response[1]);
  //   showOutput(response[1]);
  // })
  // .catch((error) => console.log(error));

  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.post('https://jsonplaceholder.typicode.com/posts')
  ])
    .then(axios.spread((todos, posts) => showOutput(todos)))
    .catch((error) => console.log(error));
}







// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };


  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      "title": "hii everyone",
      "completed": false
    },
    headers: config.headers
  })
    .then((response) => showOutput(response))
    .catch((error) => console.log(error));

}









// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'hello world'     //convert this title to UPPERCASE
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(response => showOutput(response));

}







// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=10')
    .then((response) => showOutput(response))
    .catch((error) => {
      if (error.response) {
        //server responded with a status othher than 200
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }

    });
}






// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10', {
    cancelToken: source.token
  })
    .then((response) => showOutput(response))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log('request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
}







// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date()}`);
  return config;
}, error => {
  return Promise.reject(error);
})



// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

// axiosInstance.get('/comments?_limit=10')
// .then((response) => showOutput(response))
// .catch((error) => console.log(error));





// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('put').addEventListener('click', putTodo);
document.getElementById('patch').addEventListener('click', patchTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
