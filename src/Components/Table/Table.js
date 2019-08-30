// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import MUIDataTable from 'mui-datatables'
import PropTypes from 'prop-types'
import React from 'react'
// core components
import tableStyle from './TableStyles'

function CustomTable({ ...props }) {
  const { tableTitle, data, columns, options } = props
  return (
    <MUIDataTable
      title={tableTitle}
      data={data}
      columns={columns}
      options={options}
      elevation={0}
    />
  )
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

export default withStyles(tableStyle)(CustomTable)
