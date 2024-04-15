import React from "react";

export default function App(){
  // return React.createElement('div', {}, React.createElement('h1', {}, "hellow ordl"), React.createElement('h2', {}, 'by grrnhsslr'));
  const firstName: string = "grrn";
  const lastName: string = 'hsslr';
  const isLoggedIn: boolean = true;

  const posts: {id:Number, title:String}[] = [
        {id: 1, title: 'Happy Monday'},
        {id: 2, title: 'React Rules!'},
        {id: 3, title: 'Spring has Sprung'}
  ]
  
  return (
      <>
            <h1>Hello WORld</h1>
            <h2>By: {firstName} {lastName.toUpperCase()}</h2>
            <h4>{isLoggedIn ? `Welcome Back ${firstName}${lastName}` : 'Please login or signup'}</h4>
            {posts.map(t => <h4>{t.title}</h4>)}
      </>
  )
}
