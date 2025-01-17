$(document).ready(function () {
  // Global Settings
  let edit = false;
  // Testing Jquery
  console.log('working!');
  fetchTasks();
  checklogin();
  $('#task-result').hide();
  function checklogin() {
    let checker;
    $.ajax({
      url: 'loginchecker.php',
      type: 'GET',
      success: function (response) {
        const status = JSON.parse(response);
        if (!status[0].logedin) {
          window.location.href = "login.html"
        }
        $('#username').text("welcome " + status[0].username);
       // console.log(status[0].username);
      }
    })
  }
  // search key type event
  $('#search').keyup(function () {
    if ($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'task-search.php',
        data: { search },
        type: 'POST',
        success: function (response) {
          if (!response.error) {
            let tasks = JSON.parse(response);
            let template = '';
            tasks.forEach(task => {
              template += `
                     <li><a href="#" class="task-item">${task.name}</a></li>
                    `
            });
            $('#task-result').show();
            $('#container').html(template);
          }
        }
      })
    }
  });

  $('#task-form').submit(e => {
    e.preventDefault();
    const postData = {
      name: $('#name').val(),
      description: $('#description').val(),
      id: $('#taskId').val()
    };
    const url = edit === false ? 'task-add.php' : 'task-edit.php';
    console.log("postData");
    console.log(postData, url);
    $.post(url, postData, (response) => {
      $('#task-form').trigger('reset');
      fetchTasks();
    });
  });
  $("#upload").on('submit', (function (e) {
    e.preventDefault();
    $.ajax({
      url: "uploadExcel.php",
      type: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      beforeSend: function () {
        //$("#preview").fadeOut();
        $("#err").fadeOut();
      },
      success: function (data) {
        if (data == 'invalid') {
          // invalid file format.
          $("#err").html("Invalid File !").fadeIn();
        }
        else {
          // view uploaded file.
          //$("#preview").html(data).fadeIn();
          $("#upload")[0].reset();
          fetchTasks();
         //console.log(data)
        }
      },
      error: function (e) {
        $("#err").html(e).fadeIn();
      }
    });
  }));
  // Fetching Tasks
  function fetchTasks() {
    $.ajax({
      url: 'tasks-list.php',
      type: 'GET',
      success: function (response) {
        const tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
          template += `
                  <tr taskId="${task.id}">
                  <td>${task.id}</td>
                  <td>
                  <a href="#" class="task-item">
                    ${task.name} 
                  </a>
                  </td>
                  <td>${task.description}</td>
                  <td>
                    <button class="task-delete btn btn-danger">
                     Delete 
                    </button>
                  </td>
                  </tr>
                `
        });
        $('#tasks').html(template);
      }
    });
  }

  // Get a Single Task by Id 
  $(document).on('click', '.task-item', (e) => {
    const element = $(this)[0].activeElement.parentElement.parentElement;
    const id = $(element).attr('taskId');
   // console.log(id);
    $.post('task-single.php', { id }, (response) => {
      // console.log(response);
      const task = JSON.parse(response);
      $('#name').val(task.name);
      $('#description').val(task.description);
      $('#taskId').val(task.id);
      edit = true;
    });
    e.preventDefault();
  });

  // Delete a Single Task
  $(document).on('click', '.task-delete', (e) => {
    if (confirm('Are you sure you want to delete it?')) {
      const element = $(this)[0].activeElement.parentElement.parentElement;
      const id = $(element).attr('taskId');
      $.post('task-delete.php', { id }, (response) => {
        fetchTasks();
      });
    }
  });
});