const React = require ('react')
class Indexveggies extends React.Component{
    render(){
        //map our fruits data to where we want it to go
        const{veggies}= this.props;
        return(
            <div>
                <nav>
                <a href="/veggies/new">Create a New veggies</a>
                </nav>
                <h1>Veggies Index Page</h1>
                <ul>
                    {veggies.map((veggies,i)=>{
                       return(
                        <li key={i}>
                    The{' '}
                    {/**Make sure it is calling veggies.id */}
                    <a href={`/veggies/${ veggies.id }`}>{veggies.name}</a>
                    {' '}
                    is {veggies.color}<br/>
                    {veggies.readyToEat ? 'It is ready to eat' : 'Nope, it is not good to eat'}
                    <br/>
                  </li>
                       )
                    })}
                </ul>
            </div>
        )
    }
}
module.exports = Indexveggies;