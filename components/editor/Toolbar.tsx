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
import { Descendant, Editor } from 'slate';

import editorFunctions from './CustomEditor';
import axios from 'axios';
import { useAppSelector } from '../../src/hooks';

export const Toolbar = ({ editor, value, slug }: { editor: Editor, value: Descendant[], slug: string }) => {
  const profile = useAppSelector(state => state.authentication);

  return (
    <Grid container flexDirection='row' justifyContent='space-between'>
      <Grid container item spacing={2} flex={1}>
        <Grid item>
          <ButtonGroup variant='contained' color='secondary' size='small'>
            {/* Natural language formatting group */}
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.toggleBold(editor);
              }}
            >
              <FormatBold />
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.toggleItalics(editor);
              }}
            >
              <FormatItalic />
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.toggleStrikethrough(editor);
              }}
            >
              <FormatStrikethrough />
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.toggleUnderline(editor);
              }}
            >
              <FormatUnderlined />
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.toggleSuperscript(editor);
              }}
            >
              <SuperscriptIcon />
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.toggleSubscript(editor);
              }}
            >
              <SubscriptIcon />
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.resetTags(editor);
              }}
            >
              <FormatClearIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup variant='contained' color='secondary' size='small'>
            {/* Edit element group */}
            <Button
              onClick={e => {
                e.preventDefault();
                editorFunctions.toggleCodeBlock(editor);
              }}
            >
              <FormatQuote />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid item>
        <ButtonGroup variant='contained' color='primary' size='small'>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              if (profile.id === null) return alert('Still no.');
              await editorFunctions.savePost(value, slug, profile.id);
            }}
          >
            <SaveIcon />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};