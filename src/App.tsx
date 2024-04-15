import Navigation from './components/Navigation';


export default function App(){
      // return React.createElement('div', {}, React.createElement('h1', {}, "hellow ordl"), React.createElement('h2', {}, 'by grrnhsslr'));
    const firstName: string = 'Brian';
    const lastName: string = 'Stanton';
    const isLoggedIn: boolean = true;

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Monday'},
        {id: 2, title: 'React Rules!'},
        {id: 3, title: 'Spring has Sprung'}
    ]

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <h1>Hello World</h1>
            <h2>{isLoggedIn ? `Welcome Back ${firstName} ${lastName}` : 'Please Log In or Sign Up'}</h2>
            {posts.map( p => <h4 key={p.id}>{p.title}</h4> )}
        </>
    )
}
