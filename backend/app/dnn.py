from django.conf import settings
import tensorflow as tf


# Callback to stop the model training when reached the desired accuracy 
class CheckAccuracy(tf.keras.callbacks.Callback):
    def __init__(self, desired_accuracy):
        super().__init__()
        self.desired_accuracy = desired_accuracy

    def on_epoch_end(self, epoch, logs={}):
        if logs.get('accuracy') >= self.desired_accuracy:
            self.model.stop_training = True


class DigitRecognitionModel():
    filename = settings.BASE_DIR / 'app/model.h5'

    def __init__(self):
        if self.filename.exists():
            self.model = tf.keras.models.load_model(self.filename)
        else:
            self.model = self.train_model()
            self.model.save(self.filename)

    def train_model(self, desired_accuracy=.992):
        # Load training and test set
        (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
        x_train = x_train / 255.
        x_test = x_test / 255.

        # Build the model
        model = tf.keras.Sequential([
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dense(10, activation='softmax')
        ])

        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )

        # Train the model
        callback = CheckAccuracy(desired_accuracy)
        model.fit(x_train, y_train, epochs=25, callbacks=[callback])
        
        return model

    def predict(self, arr):
        return self.model.predict(arr)
