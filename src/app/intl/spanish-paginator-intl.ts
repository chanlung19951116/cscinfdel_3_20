import {MatPaginatorIntl} from '@angular/material';

export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Registro seleccionado: ';

  return paginatorIntl;
}
