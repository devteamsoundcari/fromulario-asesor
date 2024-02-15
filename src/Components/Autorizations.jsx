import React, { useContext } from 'react'
import { FormularioContext } from '../Context/index'

const Autorizations = () => {
  const { filteredUser } = useContext(FormularioContext)

  return (
    <details>
      <summary>Últimas Autorizaciones</summary>
      {filteredUser ? (
        <article>
          <table className="authorizations-table">
            <thead>
              <tr>
                <th>Número de autorización</th>
                <th>Sucursal</th>
                <th>Fecha de expedición</th>
                <th>Vigencia hasta</th>
                <th>Producto</th>
                <th>Estado</th>
                <th>Nombre prestador</th>
                <th>Procedimiento / Medicamento</th>
                <th>Observaciones 1</th>
                <th>Observaciones 2</th>
                <th>Observaciones 3</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser.map((user, id) => (
                <tr key={id}>
                  <td>{user.numeroAutorizacion}</td>
                  <td>{user.sucursal}</td>
                  <td>{user.fechaExpedicion}</td>
                  <td>{user.fechaExpiracion}</td>
                  <td>{user.producto}</td>
                  <td>{user.estado}</td>
                  <td>{user.nombrePrestador}</td>
                  <td>{user.procedimientoMedicamento}</td>
                  <td>{user.observacion1}</td>
                  <td>{user.observacion2}</td>
                  <td>{user.observacion3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ) : (
        <h2>Usuario sin Autorizaciones</h2>
      )}
    </details>
  )
}

export { Autorizations }
