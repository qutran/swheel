<script>
  import Theme from './theme';
  import Layout from './components/Layout';
  import { Router, Route } from '../src/Router';
  import Basic from './examples/Basic';
  import Fallback from './examples/Fallback';
  import Redirect from './examples/Redirect';
  import AdvancedRedirect from './examples/AdvancedRedirect';
  import HashRoute from './examples/HashRoute';
  import Protected from './examples/Protected';
  import BeforeLeave from './examples/BeforeLeave';
  import Lazy from './examples/Lazy';
</script>

<Theme>
  <Layout>
    <Basic />
    <Fallback />
    <Redirect />
    <AdvancedRedirect />
    <HashRoute />
    <Protected />
    <BeforeLeave />
    <Lazy />
  </Layout>
</Theme>
