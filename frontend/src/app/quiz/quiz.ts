import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Question {
  word: string;
  options: string[];
  correct: string;
}

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {

  level = 'A1';
  questions: Question[] = [
    { word: 'Eloquent',   options: ['Шешен', 'Батыл', 'Зерек', 'Мейірімді'], correct: 'Шешен' },
    { word: 'Brave',      options: ['Батыл', 'Шешен', 'Жылы', 'Зерек'],      correct: 'Батыл' },
    { word: 'Smart',      options: ['Зерек', 'Батыл', 'Шешен', 'Жақсы'],     correct: 'Зерек' },
    { word: 'Kind',       options: ['Мейірімді', 'Зерек', 'Батыл', 'Жылы'],  correct: 'Мейірімді' },
    { word: 'Happy',      options: ['Бақытты', 'Зерек', 'Шешен', 'Батыл'],   correct: 'Бақытты' },
    { word: 'Strong',     options: ['Күшті', 'Жылы', 'Зерек', 'Шешен'],      correct: 'Күшті' },
    { word: 'Warm',       options: ['Жылы', 'Күшті', 'Батыл', 'Зерек'],      correct: 'Жылы' },
    { word: 'Fast',       options: ['Жылдам', 'Жылы', 'Күшті', 'Шешен'],     correct: 'Жылдам' },
    { word: 'Calm',       options: ['Тыныш', 'Жылдам', 'Батыл', 'Зерек'],    correct: 'Тыныш' },
    { word: 'Wise',       options: ['Дана', 'Тыныш', 'Жылы', 'Күшті'],       correct: 'Дана' },
  ];

  currentIndex = 0;
  correct = 0;
  wrong = 0;
  selected: string | null = null;
  answered = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p['level']) this.level = p['level'];
    });
  }

  get current(): Question {
    return this.questions[this.currentIndex];
  }

  get left(): number {
    return this.questions.length - this.currentIndex - 1;
  }

  get progress(): number {
    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }

  selectAnswer(option: string) {
    if (this.answered) return;
    this.selected = option;
    this.answered = true;
    if (option === this.current.correct) {
      this.correct++;
    } else {
      this.wrong++;
    }
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selected = null;
      this.answered = false;
    } else {
      this.router.navigate(['/app/quiz-result'], {
        queryParams: { correct: this.correct, wrong: this.wrong, total: this.questions.length }
      });
    }
  }

  skip() {
    this.wrong++;
    this.next();
  }

  getClass(option: string): string {
    if (!this.answered) return 'answer-btn';
    if (option === this.current.correct) return 'answer-btn correct';
    if (option === this.selected) return 'answer-btn wrong';
    return 'answer-btn';
  }
}