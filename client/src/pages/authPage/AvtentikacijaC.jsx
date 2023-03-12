import './Avtentikacija.css';
import Error from '../errorPage/Error';
import { useContext } from 'react';
import { UporabniskiKontekst } from '../../contexts/UporabniskiKontekst';
import { useLocation } from 'react-router-dom';
import Registracija from './RegistracijaC';
import Prijava from './PrijavaC';
import Profil from './ProfilC';

const Avtentikacija = () => {
	const location = useLocation();
	const { jeAvtenticiran } = useContext(UporabniskiKontekst);

	return (
		<div className='authPage'>
			{jeAvtenticiran ? (
				<Profil />
			) : location.state.prikazAvtentikacija === 'prijava' ? (
				<Prijava />
			) : location.state.prikazAvtentikacija === 'registracija' ? (
				<Registracija />
			) : (
				<Error />
			)}
		</div>
	);
};

export default Avtentikacija;
