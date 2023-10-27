const calculateButton = document.querySelector('.calculator__button');
const boxDay = document.getElementById("day");
const boxMonth = document.getElementById("month");
const boxYear = document.getElementById("year");
const datebox = document.querySelector('.datebox');
const outYear = document.querySelector('.result__year--span');
const outMonth = document.querySelector('.result__month--span');
const outDay = document.querySelector('.result__day--span');
const errorDay = document.querySelector('.datebox__day--error');
const errorMonth = document.querySelector('.datebox__month--error');
const errorYear = document.querySelector('.datebox__year--error');


function resetResult() {
   outDay.innerHTML = "--";
   outMonth.innerHTML = "--";
   outYear.innerHTML = "--";
   datebox.classList.add("datebox__error");
}

function easeOutQuad(t) {
   return t * (2 - t);
}

function animateValue(obj, end) {
   let startTime;
   let duration = 2000 + end * 10 - Math.random() * 1560;
   function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      obj.innerHTML = Math.floor(easedProgress * end);
      if (progress < 1) {
         window.requestAnimationFrame(step);
      }
   }

   window.requestAnimationFrame(step);
}

function isLeapYear(year) {
   return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateAge(day, month, year) {
   const monthDays = {
      1: 31,
      2: isLeapYear(year) ? 29 : 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
   };

   const today = new Date();
   const birthDate = new Date(year, month - 1, day);
   let ageYear, ageMonth, ageDay, errorcount = 0;
   if (year < today.getFullYear()) {
      ageYear = today.getFullYear() - birthDate.getFullYear();
   } else {
      if (year == today.getFullYear()) {
         if ((today.getMonth() + 1) - month > 0) {
            ageYear = 0;
         } else {
            if ((today.getMonth() + 1) - month == 0) {
               if (day <= today.getDate()) {
                  ageYear = 0;
               } else {
                  resetResult();
                  errorcount++;
                  errorDay.innerHTML = "Must be in the past";
               }
            } else {
               resetResult();
               errorcount++;
               errorMonth.innerHTML = "Must be in the past";
            }


         }
      } else {
         resetResult();
         errorcount++;
         errorYear.innerHTML = "Must be in the past";
      }
   }

   if (month > 0 && month <= 12) {
      ageMonth = today.getMonth() - birthDate.getMonth();
   } else {
      resetResult();
      errorMonth.innerHTML = "Must be a valid month";
      errorcount++;

      //!DOM SELECTOR
   };

   if (day > 0 && day <= monthDays[month]) {
      ageDay = today.getDate() - birthDate.getDate();
   } else {
      if (month > 0 && month <= 12) {
         resetResult();
         errorDay.innerHTML = "Must be a valid day";
         errorcount++;
         //!DOM SELECTOR
      }
   };

   if (ageDay < 0) {
      ageMonth--;
      ageDay += monthDays[birthDate.getMonth() + 1];
   };

   if (ageMonth < 0) {
      ageYear--;
      ageMonth += 12;
   };

   if (errorcount > 0) { return { years: undefined, months: undefined, days: undefined, } }
   else {
      return {
         years: ageYear,
         months: ageMonth,
         days: ageDay,
      }
   }
}

calculateButton.addEventListener("click", function (event) {
   errorDay.innerHTML = '';
   errorMonth.innerHTML = '';
   errorYear.innerHTML = '';
   if (boxDay.value != '' && boxMonth.value != '' && boxYear.value != '') {
      datebox.classList.remove("datebox__error");
      const result = calculateAge(boxDay.value, parseInt(boxMonth.value,), boxYear.value);
      if (result.years != undefined && result.months != undefined && result.days != undefined) {
         animateValue(outDay, result.days);
         animateValue(outMonth, result.months);
         animateValue(outYear, result.years);
      }
   } else {
      resetResult();
      datebox.classList.add("datebox__error");
      if (boxDay.value == '') {
         errorDay.innerHTML = 'field empty';
      }
      if (boxMonth.value == '') {
         errorMonth.innerHTML = 'field empty';
      }
      if (boxYear.value == '') {
         errorYear.innerHTML = 'field empty';
      }
   };
}
)
