import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Quiz } from './quiz/quiz';
import { Vocabulary } from './vocabulary/vocabulary';
import { Layout } from './layout/layout';
export const routes: Routes = [
    {path: '', component: Login},

    {path: 'app', component:Layout,
        children: [
            {path:'home', component: Home},
            {path:'profile', component:Profile},
            {path:'quiz', component: Quiz},
            {path:'vocabulary',component:Vocabulary}
        ]
    }
];
