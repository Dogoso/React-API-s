import { Routes, Route } from 'react-router-dom';
import BaseAdminPage from './paginas/Administracao/base_admin_page';
import FormNovoPrato from './paginas/Administracao/FormNovoPrato/form_novo_prato';
import FormNovoRestaurante from './paginas/Administracao/FormNovoRestaurante';
import AdministracaoPratos from './paginas/Administracao/Pratos/pratos';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/" element={<BaseAdminPage />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormNovoRestaurante />} />
        <Route path="restaurantes/:id" element={<FormNovoRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormNovoPrato />} />
        <Route path="pratos/:id" element={<FormNovoPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
