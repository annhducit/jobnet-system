import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Selection, { SelectChangeEvent } from './Selection'
import Button from '../Button'

import locationService, {
  APILocationType,
} from '../../services/locationService'

import LocationType from '../../types/location'
import { FaXmark } from 'react-icons/fa6'

export interface LocationInputChangeEvent {
  target: {
    name: string
    value: Array<LocationType>
  }
}

interface LocationInputProps {
  label?: string
  hints?: Array<LocationType>
  values?: Array<LocationType>
  value?: LocationType
  onLocationsChange?: (e: LocationInputChangeEvent) => void
  sendData?: ((data: LocationType[]) => void) | undefined
}

export default function LocationInput({
  label = 'Địa chỉ:',
  hints = [],
  values = [],
  value,
  onLocationsChange = () => null,
  sendData,
}: LocationInputProps): React.ReactElement {
  const { t } = useTranslation()

  const [listLocation, setLocation] = useState<APILocationType[]>()

  if (value?.provinceCode) {
    values.push(value)
  }

  useEffect(() => {
    void (async () => {
      const data = await locationService.getLocations()
      setLocation(data)
    })()
  }, [])

  const mappedLocations = listLocation?.map((location) => ({
    id: location.code,
    name: location.name,
  }))

  const [{ input, locations, isDialogShow, isHintsShow }, setLocationInput] =
    useState({
      input: {
        provinceCode: '',
        provinceName: '',
        specificAddress: '',
      },
      locations: values,
      isDialogShow: false,
      isHintsShow: false,
    })
  useEffect(() => {
    values.length &&
      JSON.stringify(values) !== JSON.stringify(locations) &&
      setLocationInput((prev) => ({
        ...prev,
        locations: values,
      }))
    sendData && sendData(locations)
  }, [values, locations, sendData])

  const handleDialogShow = (isDialogShow: boolean) =>
    setLocationInput((prev) => ({
      ...prev,
      isDialogShow: isDialogShow,
    }))

  const handleHintsShow = () =>
    setLocationInput((prev) => ({
      ...prev,
      isHintsShow: !prev.isHintsShow,
    }))

  const handleHintChoose = (i: number) => handleLocationCreate(hints[i])

  const handleSelectChange = (e: SelectChangeEvent) => {
    const location = mappedLocations?.find(
      (location) => location.id.toString() === e.target.value
    )
    location &&
      setLocationInput((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          provinceCode: location?.id.toString(),
          provinceName: location?.name,
        },
      }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocationInput((prev) => ({
      ...prev,
      input: {
        ...prev.input,
        specificAddress: e.target.value,
      },
    }))

  const handleLocationCreate = (newLocation: LocationType) => {
    const isExisted = locations.some(
      (location) => JSON.stringify(location) === JSON.stringify(newLocation)
    )

    if (newLocation.provinceCode && newLocation.specificAddress) {
      const _locations = !isExisted ? [...locations, newLocation] : locations

      setLocationInput((prev) => ({
        ...prev,
        input: {
          provinceCode: '',
          provinceName: '',
          specificAddress: '',
        },
        locations: _locations,
      }))
      onLocationsChange({
        target: {
          name: 'locations',
          value: _locations,
        },
      })
    }
  }

  const handleLocationClose = (i: number) => {
    const _locations = [...locations.slice(0, i), ...locations.slice(i + 1)]

    setLocationInput((prev) => ({
      ...prev,
      locations: _locations,
    }))
    onLocationsChange({
      target: {
        name: 'locations',
        value: _locations,
      },
    })
  }

  const hintElms = hints.map((hint, i) => (
    <div key={i} className="flex items-start justify-between gap-4">
      <li className="break-all text-second-upper">
        {hint.provinceName} - {hint.specificAddress}
      </li>
      <Button
        size="xs"
        color="slate"
        disabled={locations.some(
          (location) => JSON.stringify(location) === JSON.stringify(hint)
        )}
        onClick={() => handleHintChoose(i)}
      >
        {t('recruiter.locationInput.select')}
      </Button>
    </div>
  ))

  const locationElms = locations.map((location, i) => (
    <div key={i} className="flex items-start justify-between gap-4">
      <li className="break-all text-second-upper">
        {location.provinceName} - {location.specificAddress}
      </li>
      <FaXmark
        className="flex-none w-5 h-5 text-second hover:text-main"
        onClick={() => handleLocationClose(i)}
      />
      <input
        type="hidden"
        id="locations"
        name="locations"
        value={JSON.stringify(location)}
      />
    </div>
  ))

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>{label}</div>
        <div className="flex gap-2">
          <Button size="xs" onClick={() => handleDialogShow(!isDialogShow)}>
            {t('recruiter.locationInput.addAddr')}
          </Button>
          {hints.length > 0 && (
            <Button size="xs" color="cyan" onClick={handleHintsShow}>
              {t('recruiter.locationInput.preselect')}
            </Button>
          )}
        </div>
      </div>

      {isHintsShow && hints.length > 0 && (
        <ul className="pl-4 space-y-2 border-l-4 border-main-lower">
          {hintElms}
        </ul>
      )}

      <ol className="pl-4 space-y-2 border-l-4 border-main">
        {locations.length ? (
          locationElms
        ) : (
          <div className="italic text-second-upper">
            {t('recruiter.locationInput.noAddr')}
          </div>
        )}
      </ol>

      {isDialogShow && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Selection
              className="w-40"
              options={mappedLocations}
              value={input.provinceCode}
              onSelectChange={handleSelectChange}
            />
            <input
              className="text-sm border rounded-lg grow border-main-lower focus:ring-2 focus:ring-main focus:border-transparent"
              type="text"
              placeholder={t(
                'recruiter.locationInput.inputs.specificAddress.placeholder'
              )}
              value={input.specificAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button size="xs" onClick={() => handleLocationCreate(input)}>
              {t('recruiter.locationInput.buttons.create')}
            </Button>
            <Button
              color="rose"
              size="xs"
              onClick={() => handleDialogShow(false)}
            >
              {t('recruiter.locationInput.buttons.close')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
