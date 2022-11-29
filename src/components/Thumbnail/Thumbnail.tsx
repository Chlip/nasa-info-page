import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
interface IThumbnail{
  img?: string
  title?: string
  text?: string
  link?: string
}

const Thumbnail: React.FunctionComponent<IThumbnail> = (props: IThumbnail) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '2em', boxSizing:'content-box' }}>
      <CardMedia
        component="img"
        height="140"
        image={props.img}
        alt="no pic :("
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={props.link!} style={{ textDecoration: 'none' }}><Button size="small">Learn More</Button></Link>
      </CardActions>
    </Card>
  )
}

export default Thumbnail