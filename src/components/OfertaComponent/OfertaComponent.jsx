import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import './OfertaComponent.css';
import ReactPaginate from 'react-paginate';

function OfertaComponent() {
  const [ofertas, setOfertas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch('http://localhost:5000/offers/ofertas'); 
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setOfertas(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setOfertas([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las ofertas:', error);
        setIsLoading(false);
      }
    };
  
    fetchOfertas();
  }, []);
  
  const handleEditClick = (idoffer) => {
    navigate(`/admin/ofertas/editar/${idoffer}`);
  };

  const handleDeleteClick = (idoffer) => {
    setItemToDelete({ idoffer });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/offers/${itemToDelete.idoffer}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOfertas(ofertas.filter(item => item.idoffer !== itemToDelete.idoffer));
        setItemToDelete(null);
      } else {
        console.error('Error al eliminar la oferta');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddOfertasClick = () => {
    navigate('/admin/oferta/agregar');
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayOfertas = ofertas
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <tr key={item.idoffer}>
        <td>{item.idoffer}</td> 
        <td>{item.descripcion}</td> 
        <td>{item.porcentaje}</td> 
        <td>{item.startDate}</td> 
        <td>{item.endDate}</td> 
        <td>{item.idsub}</td> 
        <td>
          <IoPencilSharp className="icon edit-icon" onClick={() => handleEditClick(item.idoffer)} />
          <IoTrashOutline className="icon delete-icon" onClick={() => handleDeleteClick(item.idoffer)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(ofertas.length / itemsPerPage);

  return (
    <div className="App-oferta">
      <header className="App-header">
        <br />
        <br />
        <br />
        <h1 className="title-oferta"></h1>
      </header>
      <div className="add-oferta-button-container">
        <button className="add-oferta-button" onClick={handleAddOfertasClick}>
          <IoDuplicateOutline /> Agregar
        </button>
      </div>
      <div className="table-container-oferta">
        <table className="table-oferta">
          <thead className="color-tabla">
            <tr>
              <th>ID Oferta</th> 
              <th>Descripcion</th> 
              <th>Porcentaje</th> 
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Suscripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7">Cargando...</td>
              </tr>
            ) : (
              displayOfertas
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      {itemToDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de que deseas eliminar esta oferta?</p>
            <button className="confirm-button-oferta" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-oferta" onClick={() => setItemToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OfertaComponent;
