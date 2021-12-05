// PERFORMANCE: Because we're using Babel (right now, anyway)
// we want to cut down on modules imported so compile time for fast refreshes 
// is snappy. This only imports the icons we need.
// Named imports import the entire module.

import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatStrikethrough from '@mui/icons-material/FormatStrikethrough';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import FormatQuote from '@mui/icons-material/FormatQuote';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SubscriptIcon from '@mui/icons-material/Subscript';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import SaveIcon from '@mui/icons-material/Save';

import { Button, ButtonGroup, Grid } from "@mui/material";
import { Descendant } from 'slate';

import fn from './CustomEditor';
import { useSlate } from 'slate-react';

export const Toolbar = ({ value, slug }: { value: Descendant[], slug: string }) => {

  const editor = useSlate();

  return (
    <Grid container flexDirection='row' justifyContent='space-between'>
      <Grid container item spacing={2} flex={1}>
        <Grid item>
          <ButtonGroup variant='contained' color='secondary' size='small'>
            {/* Natural language formatting group */}
            <Button onClick={() => fn.toggleBold(editor)}>
              <FormatBold color={fn.isBold(editor) ? 'inherit' : 'action'} />
            </Button>
            <Button onClick={() => fn.toggleItalics(editor)}>
              <FormatItalic color={fn.isItalics(editor) ? 'inherit' : 'action'} />
            </Button>
            <Button onClick={() => fn.toggleStrikethrough(editor)}>
              <FormatStrikethrough color={fn.isStrikethrough(editor) ? 'inherit' : 'action'} />
            </Button>
            <Button onClick={() => fn.toggleUnderline(editor)}>
              <FormatUnderlined color={fn.isUnderline(editor) ? 'inherit' : 'action'} />
            </Button>
            <Button onClick={() => fn.toggleSuperscript(editor)}>
              <SuperscriptIcon color={fn.isSuperscript(editor) ? 'inherit' : 'action'} />
            </Button>
            <Button onClick={() => fn.toggleSubscript(editor)}>
              <SubscriptIcon color={fn.isSubscript(editor) ? 'inherit' : 'action'} />
            </Button>
            <Button onClick={() => fn.resetTags(editor)}>
              <FormatClearIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup variant='contained' color='secondary' size='small'>
            {/* Edit element group */}
            <Button onClick={() => fn.toggleCodeBlock(editor)}>
              <FormatQuote />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid item>
        <ButtonGroup variant='contained' color='primary' size='small'>
          <Button onClick={async () => await fn.savePost(value, slug)}>
            <SaveIcon />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};