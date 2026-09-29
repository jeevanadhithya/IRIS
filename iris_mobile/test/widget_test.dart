import 'package:flutter_test/flutter_test.dart';
import 'package:iris_mobile/main.dart';

void main() {
  testWidgets('IrisMobileApp smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const IrisMobileApp());
    expect(find.text('I R I S'), findsOneWidget);
  });
}
