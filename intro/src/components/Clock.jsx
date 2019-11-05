import React from 'react';
import nanoid from 'nanoid';
import NewClock from './NewClock.jsx';

var moment = require('moment');
moment().format();

export default class Clock extends React.Component {

  constructor() {
    super();
    this.state = {
      clocks: {
        hour: moment().format('h'),
        min: moment().format('mm'),
        sec: moment().format('ss'),
      },
      city: '',
      zone: '',
      zones: [],
    }
    this.int = null;
  }

  render() {

    return (
      <>
        <form action="" onSubmit={this.formSubmit}>
          <label htmlFor="city">Название</label>
          <input value={this.state.city} name='city' type="text" onChange={this.formChange} />
          <label htmlFor="zone">Временная зона</label>
          <input value={this.state.zone} name='zone' type="text" onChange={this.formChange} />
          <button>Добавить</button>
        </form>
        <div className='clocks-clockBox'>
          {this.state.zones.map(zone => <NewClock {...this.state.clocks}
            zone={zone}
            key={zone.id}
            remove={this.clockRemove}
          />)}
        </div>

      </>
    );
  }

  componentDidMount() {
    this.int = setInterval(() => this.newTimeState(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.int);

  }

  newTimeState() {
    this.setState(
      prevState => ({
        ...prevState, clocks:
        {
          hour: moment().format('h'),
          min: moment().format('mm'),
          sec: moment().format('ss'),
        }
      })
    )
  }

  formChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState(
      prevState => ({
        ...prevState, [e.target.name]: e.target.value

      })
    )
  }

  formSubmit = (e) => {
    e.preventDefault();
    let zoneReg = this.state.zone.search(/^[0-9]+$/) === -1
    let cityReg = this.state.city.search(/^[A-ZА-Яa-zа-я]+([ -]([A-ZА-Я][a-zа-я]+))?$/) === -1;

    if (cityReg) {
      this.setState(
        prevState => ({
          ...prevState, city: 'Введите город'
        })
      )
    } else if (zoneReg || (Number(this.state.zone) > 23)) {
      this.setState(
        prevState => ({
          ...prevState, zone: 'Введите временную зону'
        })
      )
    } else {
      let zon = {
        zone: e.target.zone.value,
        city: e.target.city.value,
        id: nanoid(),
      }
      this.setState(
        prevState => ({
          ...prevState, zones: [...prevState.zones, zon], city: '',
          zone: '',
        })
      )
    }
  }

  clockRemove = (id) => {
    let zoneArr = this.state.zones;
    this.setState(
      prevState => ({
        ...prevState, zones: zoneArr.filter(zon => zon.id !== id)
      })
    )
  }
}