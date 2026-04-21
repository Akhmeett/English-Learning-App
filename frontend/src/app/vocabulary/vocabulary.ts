import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VocabularyService } from './vocabulary.service';

@Component({
  selector: 'app-vocabulary',
  imports: [CommonModule, FormsModule],
  templateUrl: './vocabulary.html',
  styleUrl: './vocabulary.css',
})
export class Vocabulary implements OnInit {
  
  words: any[] = [];
  isModalOpen = false;
  selectedLevel = '';
  
  newWord = {
    english: '',
    kazakh: '',
    example: '',
    level: ''
  };

  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {
    this.loadWords();
  }

  loadWords() {
    this.vocabularyService.getWords().subscribe({
      next: (data) => this.words = data,
      error: (err) => console.error(err)
    });
  }

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

  showSuccess = false;
  
  addWord() {
    if (!this.newWord.english || !this.newWord.kazakh || !this.selectedLevel) return;
    this.vocabularyService.addWord(this.newWord).subscribe({
      next: () => {
        this.loadWords();
        this.closeModal();
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
      },
      error: (err) => console.error(err)
    });
  }

  deleteWord(id: number) {
    this.vocabularyService.deleteWord(id).subscribe({
      next: () => this.loadWords(),
      error: (err) => console.error(err)
    });
  }


  
}




