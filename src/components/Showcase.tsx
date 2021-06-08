import React from 'react'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ShowcaseSingle } from '../../models/ShowcaseSIngle';

type ShowcaseProps = {
	showcase: ShowcaseSingle;
};

const Showcase: React.FC<ShowcaseProps> = ({ showcase }) => {
	return (
		<Carousel autoPlay useKeyboardArrows>
			{showcase.Carousel.map((carouselItem) => (
				<div key={carouselItem.id}>
					<img alt={carouselItem.title} src={carouselItem.slide.url} />
					<p className="legend">{carouselItem.title}</p>
				</div>
			))}
		</Carousel>
	);
};

export default Showcase;
