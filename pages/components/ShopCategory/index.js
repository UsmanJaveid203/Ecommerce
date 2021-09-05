import Link from 'next/link';
import { shopeState } from './shopdata';
import ShopStyling from '../../../public/styles/Pro_portion.module.css';



import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


export default function index() {
    return (
            <div className={ShopStyling.shop_maindiv}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mt-5 title-all text-center">
                            <h1 className={ShopStyling.main_head}>Products Categories</h1>
                        </div>
                    </div>
                </div>
                <div className={`row container ${ShopStyling.card}`}>
                    {
                        shopeState?.map((value) => (
                            <Card data-aos="fade-up"  data-aos-anchor-placement="center-bottom" className={` mb-3 ${ShopStyling.shop_card}`}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="category_photo"
                                        height="250"
                                        image={value.img}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography  gutterBottom variant="h5" component="h2">
                                            {value.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link href={value.btnlink}>
                                        <a className={ShopStyling.btn_link} size="small" color="primary"> SHOP NOW <i className="fas fa-arrow-right"></i></a>
                                    </Link>
                                </CardActions>
                            </Card>
                        ))
                    } 
                </div>
            </div>
    )
}
