import React, { useContext } from 'react'
import { BiCollapseVertical } from 'react-icons/bi'
import { formatDate } from '../lib/utils'
import { FormularioContext } from '../Context/index'

const Autorizations = () => {
  const { filteredUser } = useContext(FormularioContext)

  return (
    <details>
      <summary>
        Últimas Autorizaciones
        <span className="icon-span">
          <BiCollapseVertical />
        </span>
      </summary>
      {filteredUser?.length > 0 ? (
        <article className="table-cont">
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
                {/* <th>Procedimiento / Medicamento</th>
                <th>Observaciones 1</th>
                <th>Observaciones 2</th>
                <th>Observaciones 3</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredUser.map((user, id) => (
                <tr key={id}>
                  <td>{user?.idAuthorization}</td>
                  <td>{user?.branch}</td>
                  <td>{formatDate(user?.dateStart)}</td>
                  <td>{formatDate(user?.dateEnd)}</td>
                  <td>{user?.product}</td>
                  <td>{user?.status}</td>
                  <td>{user?.practitioner}</td>
                  {/* <td>{user.procedimientoMedicamento}</td>
                  <td>{user.observacion1}</td>
                  <td>{user.observacion2}</td>
                  <td>{user.observacion3}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ) : (
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
              </tr>
            </thead>
          </table>
          <h2>El usuario no tiene Autorizaciones</h2>
        </article>
      )}
    </details>
  )
}

export { Autorizations }
