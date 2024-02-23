let questionCount = 1;

function addQuestion() {
  questionCount++;
  const newQuestion = `
          <div class="form-group">
            <label for="question${questionCount}">Câu hỏi ${questionCount}:</label>
            <input type="text" class="form-control m-1" id="question${questionCount}" placeholder="Câu hỏi" formControlName="question">
            <div class="form-group mt-2">
              <label for="answer${questionCount}1">Câu trả lời:</label>
              <input type="text" class="form-control m-1" id="answer${questionCount}1" placeholder="Đáp án A" formControlName="answerA">
              <input type="text" class="form-control m-1" id="answer${questionCount}2" placeholder="Đáp án B" formControlName="answerB">
              <input type="text" class="form-control m-1" id="answer${questionCount}3" placeholder="Đáp án C" formControlName="answerC">
              <input type="text" class="form-control m-1" id="answer${questionCount}4" placeholder="Đáp án đúng" formControlName="correctAnswer">
            </div>
          </div>
        `;
  document.getElementById('questions').insertAdjacentHTML('beforeend', newQuestion);
}