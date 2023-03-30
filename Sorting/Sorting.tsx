import { Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import FormikSelect from 'src/components/FormikSelect/FormikSelect'
import Icon from 'src/components/Icon/Icon'
import { AppStreamTypeChoices } from 'src/generated/graphql'
import { Options } from 'src/types'
import './Sorting.scss'

interface ISorting {
  onSort: (values: ISortValues, formikHelpers: FormikHelpers<ISortValues>) => void
}

export interface ISortValues {
  type: string
  orderBy: string
}

export const initialSortValues: ISortValues = {
  type: '',
  orderBy: 'date_created',
}

const streamTypeOptions: Options = [
  { label: 'All', value: '' },
  { label: 'Public', value: AppStreamTypeChoices.Public.toLocaleLowerCase() },
  { label: 'Private', value: AppStreamTypeChoices.Private.toLocaleLowerCase() },
]

const sortByOptions: Options = [
  { label: 'Novelty', value: 'date_created' },
  { label: 'Popularity', value: 'viewers' },
]

const Sorting: React.FC<ISorting> = React.memo(props => {
  const { onSort } = props
  const [isFilters, setFilters] = useState<boolean>(false)

  const isDesktop = useMediaQuery({ minWidth: 768 })

  useEffect(() => {
    if (isDesktop) {
      setFilters(false)
    }
  }, [isDesktop])

  return (
    <ClickAwayListener onClickAway={() => setFilters(false)}>
      <div className="sorting">
        <MediaQuery maxWidth={767}>
          <button className="sorting__btn-filter" type="button" onClick={() => setFilters(!isFilters)}>
            <Icon name="filters" />
          </button>
        </MediaQuery>
        <Formik initialValues={initialSortValues} onSubmit={onSort}>
          {({ handleSubmit }) => (
            <Form className={`sorting__sort ${isFilters ? 'sorting__sort--open' : ''}`}>
              <MediaQuery maxWidth={767}>
                <button className="sorting__btn-close" type="button" onClick={() => setFilters(false)}>
                  <Icon name="close" />
                </button>
              </MediaQuery>
              <FormikSelect
                className="sorting__select"
                name="type"
                options={streamTypeOptions}
                type="alt"
                label="Stream type:"
                changeHandler={() => handleSubmit()}
              />
              <FormikSelect
                className="sorting__select"
                name="orderBy"
                options={sortByOptions}
                type="alt"
                label="Sort by:"
                changeHandler={() => handleSubmit()}
              />
            </Form>
          )}
        </Formik>
      </div>
    </ClickAwayListener>
  )
})

export default Sorting
