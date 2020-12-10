import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker, Callout } from 'react-native-maps';
export default class App extends React.Component {

    state = { items: []}




    mapMarkers = () => {
        return this.state.items.map((items) => <Marker
            key={items.id}
            coordinate={{ latitude: items.geoLocation.latitude, longitude: items.geoLocation.longitude }}

        >
            <Callout>
                <View style={styles.container}>
                    <Text style={{fontFamily: "Cochin", fontSize: 20, padding: 2}}>Navn: {items.acceptedVernacularName}</Text>

                    <Text style={{fontFamily: "Cochin", fontSize: 20, padding: 2}}>Artgruppe: {items.speciesGroup}</Text>

                    <Text style={{fontFamily: "Cochin", fontSize: 20, padding: 2}}>Fundet af: {JSON.stringify(items.observers)}</Text>


                </View>
            </Callout>

        </Marker >)
    }





  componentDidMount = async () => {
      fetch('https://arpo-prod-api-app.azurewebsites.net/records/?searchText=&take=200&zoomLevel=6.666666666666667&mapBounds=2.6751556015624987&mapBounds=51.60844029913605&mapBounds=17.199081382812498&mapBounds=58.80575519852428&speciesGroups=Pattedyr&speciesGroups=Fugle&searchMode=3&includeDescendantTaxons=true&isDeleted=&hasMedia=false&excludeSaughtButNotFound=true&includeSpeciesGroupFacet=false&includeOrphanRecords=false&url=')
          .then(res => res.json())
          .then(data => {
              this.setState({ items: data.items })
          })
          .catch(console.error)
    };
  render() {
      return (

            <MapView
                style={styles.map}
                     initialRegion={{
                         latitude: 55.6515204,
                         longitude: 12.5043674,
                         latitudeDelta: 0.0932,
                         longitudeDelta: 0.0420,
                     }}>
              {this.mapMarkers()}
            </MapView>

      );

  }
}

const styles = StyleSheet.create({
  container: {
      height: 100,
      width: 300,

  },
  map: { flex: 1 },
  infoBox: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10,
      color:'#fff',
      fontSize: 40,
  },

});
