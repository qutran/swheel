<script>
  import Theme from './theme';
  import Layout from './components/Layout';
  import ExamplesPage from './pages/Examples';
  import HomePage from './pages/Home';
  import { Router, Route } from '../src/Router';
</script>

<Router>
  <Theme>
    <Layout>
      <Route path="/" exact component={HomePage} />
      <Route path="/examples" component={ExamplesPage} />
    </Layout>
  </Theme>
</Router>
