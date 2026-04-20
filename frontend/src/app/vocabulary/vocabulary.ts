import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-vocabulary',
  imports: [CommonModule, FormsModule],
  templateUrl: './vocabulary.html',
  styleUrl: './vocabulary.css',
})
export class Vocabulary {
  isModalOpen = false;
  selectedLevel = '';
  newWord = {
    english: '',
    kazakh: '',
    example: '',
    level: ''
  };
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedLevel = '';
    this.newWord = { english: '', kazakh: '', example: '', level: '' };
  }
  selectLevel(level: string) {
    this.selectedLevel = level;
    this.newWord.level = level;
  }
  addWord() {
    if (!this.newWord.english || !this.newWord.kazakh || !this.selectedLevel) return;
    console.log('Жаңа сөз:', this.newWord);
    this.closeModal();
  }
}
