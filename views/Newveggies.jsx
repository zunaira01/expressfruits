const React = require('react');
class Newveggies extends React.Component {
    render () {
        return(
        <div>
            <h1>Create Veggies Page</h1>
            <form action="/veggies" method="POST">
                Name: <input type="text" name="name" /><br />
                Color: <input type="text" name="color" /><br/>
                Is Ready To Eat: <input type='checkbox' name="readyToEat" /><br/>
                <input type='submit' name="" value="Create Veggies" />
            </form>
        </div>
    );
}
}
module.exports = Newveggies;