import React from 'react';
import {Card, CardActions, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import {cyan700} from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/maps/directions-run';

import '../styles/venue.scss';


export default class Venue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'nice bar',
      description: 'as dlk jasldkj alks dlaks dlaksd lkj alk lkasdlk jaslkd lka ksaldkajsdl k alsdkjl akjsdlkjas dlkjsald',
      thumbnailUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/5if54pPcQzBvPKy55fddDw/ms.jpg',
      headerUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/5if54pPcQzBvPKy55fddDw/o.jpg',
      numGoing: 0,
      distance: 50.4,
      phone: 491029348182,
      userGoing: false,
    }
  }

  render() {
    return (
      <Card className="venue">

        <CardMedia className="image" size={30} >
          <img src={this.state.headerUrl} />
        </CardMedia>

        <CardTitle className="title">
          <div>{this.state.name}</div>
        </CardTitle>

        <CardText className="info">
          <div className="align-left">{this.state.phone}</div>
          <div className="align-right">{this.state.distance} metres away</div>
        </CardText>

        <CardText className="description">
          {this.state.description}
        </CardText>

        <CardActions>
          <div className="attend" >
            <Badge
              badgeContent={this.state.numGoing}
              secondary={true}
              badgeStyle={{top: 12, right: 12}}
            >
              <IconButton tooltip="Attend">
                <NotificationsIcon color={this.state.userGoing ? cyan700 : null} secondary={true}/>
              </IconButton>
            </Badge>
          </div>
        </CardActions>
      </Card>
    );
  }
}
