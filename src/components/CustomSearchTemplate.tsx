import Card from '@mui/material/Card'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { FormEvent, ReactNode } from 'react'

interface SearchChip {
  key: string
  label: string
}

interface GridField {
  row: number
  column: number
  element: ReactNode
}

interface UiState {
  isSearchExpanded: boolean
}

interface Props {
  title: string
  fields: GridField[]
  searchChips: SearchChip[]
  onSearch: () => void
  onReset: () => void
  onDeleteSearchChip: (key: string) => void
  columnSpans: number[]          // 12-column scale, e.g. [2,4,3,3]
  toggleExpand: () => void
  uiState: UiState
}

const spanToPercent = (span: number) => `${(span / 12) * 100}%`

const CustomSearchTemplate = ({
  title,
  fields,
  searchChips,
  onSearch,
  onReset,
  onDeleteSearchChip,
  columnSpans,
  toggleExpand,
  uiState
}: Props) => {
  const { isSearchExpanded } = uiState

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch()
  }

  // build lookup map  "row-col" → field
  const fieldMap = fields.reduce<Record<string, GridField>>((acc, f) => {
    acc[`${f.row}-${f.column}`] = f
    return acc
  }, {})

  const maxRow = Math.max(0, ...fields.map(f => f.row))

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ p: 1, border: '1px solid #E0E0E0' }}>
        {/* title + expand */}
        <Box display="flex" alignItems="center" px={2} py={1}>
          <Box flexGrow={1}>
            <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={toggleExpand}>
              {title}
            </Typography>
          </Box>
          <IconButton onClick={toggleExpand}>
            <ExpandMoreIcon
              sx={{
                fontSize: '1.6rem',
                transition: 'transform 0.4s ease-in-out',
                transform: isSearchExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </IconButton>
        </Box>

        {/* search fields */}
        <Collapse in={isSearchExpanded}>
          <Box px={3} py={2}>
            {Array.from({ length: maxRow + 1 }).map((_, rowIdx) => (
              <Box key={rowIdx} display="flex" flexWrap="wrap" mb={2} gap={2}>
                {[0, 1, 2, 3].map(colIdx => {
                  const field = fieldMap[`${rowIdx}-${colIdx}`]
                  if (!field) return null
                  const width = spanToPercent(columnSpans[colIdx] ?? 3)
                  return (
                    <Box key={colIdx} flex={`0 0 ${width}`} maxWidth={width}>
                      {field.element}
                    </Box>
                  )
                })}
              </Box>
            ))}
          </Box>
        </Collapse>

        {/* chips + buttons */}
        <Box display="flex" alignItems="center" px={2} py={1}>
          <Box flexGrow={1}>
            {!isSearchExpanded &&
              (searchChips.length ? (
                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                  {searchChips.map(chip => (
                    <Chip
                      key={chip.key}
                      label={chip.label}
                      onDelete={() => onDeleteSearchChip(chip.key)}
                      size="small"
                    />
                  ))}
                </Box>
              ) : (
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  sx={{ cursor: 'pointer' }}
                  onClick={toggleExpand}
                >
                  <AddCircleOutlineIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Add Filter</Typography>
                </Box>
              ))}
          </Box>

          <Box display="flex" gap={1}>
            <Tooltip title="Search" placement="top" arrow>
              <IconButton
                size="medium"
                type="submit"
                sx={{
                  transition: 'all .5s cubic-bezier(.4,0,.2,1)',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                <SearchIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reset" placement="top" arrow>
              <IconButton
                size="medium"
                onClick={onReset}
                sx={{
                  transition: 'all .5s cubic-bezier(.4,0,.2,1)',
                  '&:hover': {
                    color: 'error.main',
                    transform: 'translateY(2px) rotate(-90deg)'
                  }
                }}
              >
                <RestartAltIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </form>
  )
}

export default CustomSearchTemplate
