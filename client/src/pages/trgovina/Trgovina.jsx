import './Trgovina.css';
import { useEffect, useState, useRef } from 'react';
import { NakupovalniKontekstProvider } from '../../contexts/NakupovalniKontekst';
import VsebinaTrgovine from './VsebinaTrgovineC';
import NavigacijaTrgovine from './NavigacijaTrgovineC';
import { ArrowCircleUp } from 'phosphor-react';

const Trgovina = ({ Ref }) => {
	const [vidno, setVidno] = useState(0); // 0 - zgoraj, 2 - vidno
	const [prikazi, setPrikazi] = useState('nakupovanje');
	const [cenaKosarice, setCenaKosarice] = useState(0);
	const [naVrh, setNaVrh] = useState(false);
	const prejsnjiOdmik = useRef(0);
	const [niProduktov, setNiProduktov] = useState(true);

	useEffect(() => {
		if (prikazi === 'nakupovanje') {
			const pomikanje = () => {
				if (naVrh) {
					setNaVrh(false);
				}
				let odmikOdVrha = window.pageYOffset;

				if (odmikOdVrha < 235) {
					setVidno(0);
				} else if (naVrh) {
					setVidno(0);
				} else {
					if (prejsnjiOdmik.current < odmikOdVrha) {
						setVidno(2);
					} else {
						setVidno(0);
					}
				}

				prejsnjiOdmik.current = odmikOdVrha;
			};
			window.addEventListener('scroll', pomikanje);
			return () => {
				window.removeEventListener('scroll', pomikanje);
			};
		}
	});

	useEffect(() => {
		if (naVrh) {
			Ref.current.scrollIntoView({ behaviour: 'smooth' });
		}
	}, [naVrh, Ref]);

	return (
		<NakupovalniKontekstProvider>
			<div className='trgovina'>
				<NavigacijaTrgovine
					vidno={vidno}
					setVidno={setVidno}
					prikazi={prikazi}
					setPrikazi={setPrikazi}
					cenaKosarice={cenaKosarice}
				/>
				<VsebinaTrgovine
					setVidno={setVidno}
					prikazi={prikazi}
					setPrikazi={setPrikazi}
					setCenaKosarice={setCenaKosarice}
					niProduktov={niProduktov}
					setNiProduktov={setNiProduktov}
				/>
				{prikazi === 'nakupovanje' && (prejsnjiOdmik.current > 450 || vidno === 2) ? (
					<div
						className='naVrh'
						onClick={() => {
							setVidno(0);
							setNaVrh(true);
						}}>
						<ArrowCircleUp size={35} />
					</div>
				) : (
					<></>
				)}
			</div>
		</NakupovalniKontekstProvider>
	);
};

export default Trgovina;
