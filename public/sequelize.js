// 부서 이름 눌렀을 때 사원 로딩
document.querySelectorAll('#dept-list tbody tr td').forEach((el) => {
  el.addEventListener('click', async function () {
    if (el != el.parentElement.lastElementChild) {
        const dept_no = el.parentElement.firstElementChild.textContent;
        getEmployee(dept_no);
      }
      else {
        try {
        await axios.delete(`/depts/${el.parentElement.firstElementChild}`);
        getDept(el.parentElement.firstElementChild);
      } catch (err) {
        console.error(err);
      }
    }
  });
});
// 부서 로딩
async function getDept() {
  try {
    const res = await axios.get('/depts');
    const depts = res.data;
    const tbody = document.querySelector('#dept-list tbody');
    tbody.innerHTML = '';
    depts.map(function (dept) {
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        getEmployee(dept.dept_no);
      });
      // 로우 셀 추가
      let td = document.createElement('td');
      td.textContent = dept.dept_no;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = dept.dept_name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = dept.phone;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = dept.check ? 'O' : 'X';
      row.appendChild(td);
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { // 삭제 클릭 시
        try {
          await axios.delete(`/depts/${dept.dept_no}`);
          getDept(dept_no);
        } catch (err) {
          console.error(err);
        }
      });
      td = document.createElement('td');
      td.appendChild(remove);
      row.appendChild(td);      
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
// 사원 로딩
async function getEmployee(dept_no) {
  try {
    const res = await axios.get(`/depts/${dept_no}/employees`);
    const employees = res.data;
    const tbody = document.querySelector('#employee-list tbody');
    tbody.innerHTML = '';
    employees.map(function (employee) {
      // 로우 셀 추가
      const row = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = employee.p_no;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = employee.name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = (employee.salary == '') ? 'X' : employee.salary;
      row.appendChild(td);
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.addEventListener('click', async () => { // 수정 클릭 시
        const newEmployee = prompt('바꿀 내용을 입력하세요');
        if (!newEmployee) {
          return alert('내용을 반드시 입력하셔야 합니다');
        }
        try {
          await axios.patch(`/employees/${employee.p_no}`, { name: newEmployee });
          getEmployee(dept_no);
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { // 삭제 클릭 시
        try {
          await axios.delete(`/employees/${employee.p_no}`);
          getEmployee(dept_no);
        } catch (err) {
          console.error(err);
        }
      });
      // 버튼 추가
      td = document.createElement('td');
      td.appendChild(edit);
      row.appendChild(td);
      td = document.createElement('td');
      td.appendChild(remove);
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
// 부서 등록 시
document.getElementById('dept-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const dept_no = e.target.dept_no.value;
  const dept_name = e.target.dept_name.value;
  const phone = e.target.phone.value;
  const check = e.target.check.checked;
  if (!dept_no) {
    return alert('부서번호를 입력하세요');
  }
  if (!dept_name) {
    return alert('부서이름을 입력하세요');
  }
  try {
    await axios.post('/depts', { dept_no, dept_name, phone, check });
    getDept();
  } catch (err) {
    console.error(err);
  }
  e.target.dept_no.value = '';
  e.target.dept_name.value = '';
  e.target.phone.value = '';
  e.target.check.checked = false;
});
// 사원 등록 시
document.getElementById('employee-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const dept_no = e.target.dept_no.value;
  const name = e.target.name.value;
  const salary = e.target.salary.value;
  if (!dept_no) {
    return alert('부서번호를 입력하세요');
  }
  if (!name) {
    return alert('사원이름을 입력하세요');
  }
  try {
    await axios.post('/employees', { name, salary, dept_no});  
    getEmployee(dept_no);
  } catch (err) {
    console.error(err);
  }
  e.target.dept_no.value = '';
  e.target.name.value = '';
  e.target.salary.value = '';
});