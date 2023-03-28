function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeIn = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date,
    };
    this.timeInEvents.push(timeIn);
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeOut = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    };
    this.timeOutEvents.push(timeOut);
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find((e) => e.date === date);
    const timeOut = this.timeOutEvents.find((e) => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }
  
  function allWagesFor() {
    const datesWorked = this.timeInEvents.map((e) => e.date);
    const payable = datesWorked.reduce(
      (acc, date) => acc + wagesEarnedOnDate.call(this, date),
      0
    );
    return payable;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((e) => e.firstName === firstName);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce(
      (acc, employee) => acc + allWagesFor.call(employee),
      0
    );
  }
  