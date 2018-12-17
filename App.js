import React from 'react';
import { Text, View } from 'react-native';
import { Icon, SearchBar, TabBar } from '@ant-design/react-native';
export default class BasicTabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
    };
    this.renderContent = this.renderContent.bind(this);
  }
  renderContent(pageText, tabName) {
    const hide = tabName === this.state.selectedTab;
    console.log(hide , tabName , this.state.selectedTab);
    
    if (hide) {
      return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
          <Text style={{ margin: 50 }}>{pageText},{tabName}</Text>
        </View>
      );
    }
    else{
      return null;
    }
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title="Life"
          icon={<Icon name="home" />}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => this.onChangeTab('blueTab')}
        >
          {this.renderContent('Life Tab', 'blueTab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="ordered-list" />}
          title="Koubei"
          badge={2}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => this.onChangeTab('redTab')}
        >
          {this.renderContent('Koubei Tab', 'redTab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="like" />}
          title="Friend"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}
        >
          {this.renderContent('Friend Tab', 'greenTab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="My"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}
        >
          {this.renderContent('My Tab', 'yellowTab')}
        </TabBar.Item>
      </TabBar>
    );
  }
}